# AngularJwt
Angular + JWT + Google/Facebook Auth

ინსტრუქცია:

1. npm install
2. src/environments/environment.ts-ში http://localhost:8000 ჩაანაცვლე შენი ბექის მისამართით (ლოკალზე ალბათ იგივე იქნება) 
3. src/app/services/token.service.ts ფაილში მე-7 ხაზზე ჩაწერი შენი პროექტის შესაბამისი key ტოკენისთვის
4. facebook-ითა და google-ით დალოგინებისთვის src/app/socialloginConfig.ts ფაილში მე-8 და მე-12 ხაზზე კონსტრუქტორებს გადაეცი შესაბამისად facebook აპლიკაციის id და google-ის აპლიკაციის client id
