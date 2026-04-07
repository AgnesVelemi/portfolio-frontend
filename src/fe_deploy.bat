:: ssh -i C:/Users/User/.ssh/portfolio-siample-key.pem ubuntu@13.63.37.93
:: cd c:/ws/2026/portfolio-frontend/src
:: fe_deploy or .\fe_deploy.bat

set PRIVATE_KEY_PATH= "C:/Users/User/.ssh/portfolio-siample-key.pem"

set SERVER_USER="ubuntu"
set SITE_DOMAIN="13.63.37.93"

set FRONTEND_DIR="C:/ws/2026/portfolio-frontend"
::set FRONTEND_BUILD_DIR="%FRONTEND_DIR%/dist/portfolio-fe"
set FRONTEND_BUILD_DIR="C:/ws/2026/portfolio-frontend/dist/portfolio-frontend"
set REMOTE_FRONTEND_DIR="~/frontend"


:: Delete all existing frontend files
echo ssh -i %PRIVATE_KEY_PATH% %SERVER_USER%@%SITE_DOMAIN% "sudo rm -rf %REMOTE_FRONTEND_DIR%/*"

ssh -i %PRIVATE_KEY_PATH% %SERVER_USER%@%SITE_DOMAIN% "sudo rm -rf %REMOTE_FRONTEND_DIR%/*"


:: Copy frontend files
echo scp -i %PRIVATE_KEY_PATH% -r %FRONTEND_BUILD_DIR%/* %SERVER_USER%@%SITE_DOMAIN%:%REMOTE_FRONTEND_DIR%
scp -i C:/Users/User/.ssh/portfolio-siample-key.pem -r C:/ws/2026/portfolio-frontend/dist/portfolio-frontend/browser/* ubuntu@13.63.37.93:/home/ubuntu/frontend



::scp -i %PRIVATE_KEY_PATH% -r %FRONTEND_BUILD_DIR%/* %SERVER_USER%@%SITE_DOMAIN%:%REMOTE_FRONTEND_DIR%
ssh -i %PRIVATE_KEY_PATH% %SERVER_USER%@%SITE_DOMAIN% "scp -i %PRIVATE_KEY_PATH% -r "%FRONTEND_BUILD_DIR%/*" %SERVER_USER%@%SITE_DOMAIN%:%REMOTE_FRONTEND_DIR%

echo scp -i C:/Users/User/.ssh/portfolio-siample-key.pem -r C:/ws/2026/portfolio-frontend/dist/portfolio-frontend/browser/* ubuntu@13.63.37.93:/home/ubuntu/frontend
scp -i C:/Users/User/.ssh/portfolio-siample-key.pem -r C:/ws/2026/portfolio-frontend/dist/portfolio-frontend/browser/* ubuntu@13.63.37.93:/home/ubuntu/frontend
