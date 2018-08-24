cd public;
rm -rf php;
cd ..;

ng build -c production;

cd public;
cp -R ../public-php php;
cd ..;
