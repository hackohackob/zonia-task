import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { TimeService } from './services/time.service';
import { UserService } from './services/user.service';
import { User } from './models/user';
import cors from 'cors';

dotenv.config();
class RaffleSerer {
  private app: Express;
  private port: string | number;
  private isDev: boolean;

  private timeService: TimeService;
  private userService: UserService;

  private generatedWinninUser: User | null = null;

  constructor() {

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.isDev = process.env.DEV === 'true';

    this.timeService = new TimeService();
    this.userService = new UserService();

    this.setDevMode(); // only for development purposes
    this.addMiddlewares();
    this.addRoutes();
    this.start();
  }

  setDevMode() {
    this.isDev = true;
  }

  addMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
  }

  addRoutes() {
    this.app.get('/api/user', (req: Request, res: Response) => {
      const getTimeLeftUntilNextRaffle = this.timeService.getTimeLeftUntilNextRaffle();
      if (getTimeLeftUntilNextRaffle > 0) { // if the time left until the next raffle is positive, return null as the user and the time left until the next raffle
        res.json({
          user: null,
          timeLeftUntilNextRaffleMs: getTimeLeftUntilNextRaffle
        });
      } else {
        this.generatedWinninUser = this.generatedWinninUser || this.userService.getNewRandomUser(); // on the first request after the raffle, generate a new user and then return the same user
        res.json({
          user: this.generatedWinninUser,
        });
      }
    });

    this.app.get('/api/time', (req: Request, res: Response) => {
      res.json({
        timeOfNextRaffle: this.timeService.getTimeOfNextRaffle(),
        timeLeftUntilNextRaffleMs: this.timeService.getTimeLeftUntilNextRaffle()
      });
    });

    this.app.post('/api/reset', (req: Request, res: Response) => {
      this.generatedWinninUser = null;
      this.timeService.reset();
      res.json({
        message: "Reset successful",
        timeOfNextRaffle: this.timeService.getTimeOfNextRaffle(),
        timeLeftUntilNextRaffleMs: this.timeService.getTimeLeftUntilNextRaffle()
      });
    });

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(__dirname + '/public/index.html');
    });
    
    if (this.isDev) {
      // this is a dev endpoint that will expire the time until the next raffle
      // should be used only for testing purposes
      this.app.post('/api/dev/expire-time', (req: Request, res: Response) => {
        this.timeService._setTimeOfNextRaffle(new Date());
        res.json({
          message: "Time expired"
        });
      });
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const raffleServer = new RaffleSerer();