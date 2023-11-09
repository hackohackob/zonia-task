@echo off
set "sourcePath=.\raffle-frontend\dist\raffle-frontend"
set "destinationPath=.\raffle-backend\public\"

echo Transferring Angular dist folder...

xcopy /E /I /Y "%sourcePath%" "%destinationPath%"

echo Transfer complete.
pause