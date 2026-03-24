-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NONEPAID', 'PARTPAID', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('SUBMITTED', 'PREPARED', 'SENDED', 'END', 'FAILED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IS', 'OUT');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('RU', 'EN', 'PL', 'BY', 'UK', 'ES');

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryNameJson" JSONB NOT NULL,
    "categoryDescriptionJson" JSONB NOT NULL,
    "categorySeoMetaJson" JSONB NOT NULL,
    "categoryNameSetParametrsJson" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "categoryPath" TEXT NOT NULL DEFAULT '',
    "top" BOOLEAN NOT NULL DEFAULT false,
    "status" INTEGER NOT NULL DEFAULT 0,
    "furlCategory" TEXT NOT NULL,
    "code1c" TEXT,
    "codeChange" TEXT,
    "avatar" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "idProductNameJson" INTEGER NOT NULL,
    "idProductDescriptionJson" INTEGER NOT NULL,
    "idProductSeoJson" INTEGER NOT NULL,
    "joinGroupId" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "idOrder" INTEGER NOT NULL,
    "furlProduct" TEXT NOT NULL,
    "model" TEXT,
    "sku" TEXT,
    "upc" TEXT,
    "ean" TEXT,
    "jan" TEXT,
    "isbn" TEXT,
    "mpn" TEXT,
    "code1c" TEXT,
    "codechange" TEXT,
    "quantity" INTEGER NOT NULL,
    "subtract" BOOLEAN NOT NULL DEFAULT true,
    "stockStatus" "StockStatus" NOT NULL,
    "idCurrency" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "price1" DOUBLE PRECISION NOT NULL,
    "price2" DOUBLE PRECISION NOT NULL,
    "priceUSD" DOUBLE PRECISION,
    "priceUSD1" DOUBLE PRECISION,
    "priceUSD2" DOUBLE PRECISION,
    "priceEUR" DOUBLE PRECISION,
    "priceEUR1" DOUBLE PRECISION,
    "priceEUR2" DOUBLE PRECISION,
    "dateAvailabale" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION,
    "idUnitWeightJson" INTEGER NOT NULL,
    "length" DOUBLE PRECISION,
    "idUnitLengthJson" INTEGER NOT NULL,
    "width" DOUBLE PRECISION,
    "idUnitWidthJson" INTEGER NOT NULL,
    "height" DOUBLE PRECISION,
    "idUnitHeightJson" INTEGER NOT NULL,
    "idDataSetParametrsJson" INTEGER NOT NULL,
    "idManufacturer" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "images" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNameJson" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductNameJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDescriptionJson" (
    "id" SERIAL NOT NULL,
    "description" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDescriptionJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSeoJson" (
    "id" SERIAL NOT NULL,
    "seo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSeoJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitWeightJson" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitWeightJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitLengthJson" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitLengthJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitWidthJson" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitWidthJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitHeightJson" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitHeightJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSetParametrsJson" (
    "id" SERIAL NOT NULL,
    "dataSetParametrsJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataSetParametrsJson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameJSON" JSONB NOT NULL,
    "image" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "language" "Language",
    "name" TEXT NOT NULL,
    "email" TEXT,
    "mobile" TEXT NOT NULL,
    "phone" TEXT,
    "addres" TEXT,
    "postalAddres" TEXT,
    "otherInfo" JSONB NOT NULL,
    "note" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "cart" TEXT,
    "wishlist" TEXT[],
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "status" INTEGER NOT NULL,
    "safe" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "invoice" INTEGER NOT NULL,
    "idCustomer" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "payer" JSONB NOT NULL,
    "shipping" JSONB NOT NULL,
    "total" DOUBLE PRECISION,
    "idCurrency" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL,
    "idMarketing" INTEGER NOT NULL,
    "tracking" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "ip" TEXT NOT NULL,
    "ipForwarded" TEXT,
    "userAgent" TEXT NOT NULL,
    "acceptLanguage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "datePayment" TIMESTAMP(3) NOT NULL,
    "idOrder" INTEGER NOT NULL,
    "idPayerInitial" INTEGER NOT NULL,
    "idPayerCorrect" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPayment" (
    "id" SERIAL NOT NULL,
    "idOrder" INTEGER NOT NULL,
    "idPayment" INTEGER NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "I18n" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "image" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "colorText" TEXT NOT NULL DEFAULT 'black',
    "colorBackground" TEXT NOT NULL DEFAULT 'white',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "I18n_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "codeCurrency" TEXT NOT NULL,
    "valueCurrency" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "_ProductCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_furlCategory_key" ON "Category"("furlCategory");

-- CreateIndex
CREATE UNIQUE INDEX "Product_idProductNameJson_key" ON "Product"("idProductNameJson");

-- CreateIndex
CREATE UNIQUE INDEX "Product_idProductDescriptionJson_key" ON "Product"("idProductDescriptionJson");

-- CreateIndex
CREATE UNIQUE INDEX "Product_idProductSeoJson_key" ON "Product"("idProductSeoJson");

-- CreateIndex
CREATE UNIQUE INDEX "Product_furlProduct_key" ON "Product"("furlProduct");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE INDEX "_ProductCategory_B_index" ON "_ProductCategory"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idProductNameJson_fkey" FOREIGN KEY ("idProductNameJson") REFERENCES "ProductNameJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idProductDescriptionJson_fkey" FOREIGN KEY ("idProductDescriptionJson") REFERENCES "ProductDescriptionJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idProductSeoJson_fkey" FOREIGN KEY ("idProductSeoJson") REFERENCES "ProductSeoJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idCurrency_fkey" FOREIGN KEY ("idCurrency") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idUnitWeightJson_fkey" FOREIGN KEY ("idUnitWeightJson") REFERENCES "UnitWeightJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idUnitLengthJson_fkey" FOREIGN KEY ("idUnitLengthJson") REFERENCES "UnitLengthJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idUnitWidthJson_fkey" FOREIGN KEY ("idUnitWidthJson") REFERENCES "UnitWidthJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idUnitHeightJson_fkey" FOREIGN KEY ("idUnitHeightJson") REFERENCES "UnitHeightJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idDataSetParametrsJson_fkey" FOREIGN KEY ("idDataSetParametrsJson") REFERENCES "DataSetParametrsJson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idManufacturer_fkey" FOREIGN KEY ("idManufacturer") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idPayerInitial_fkey" FOREIGN KEY ("idPayerInitial") REFERENCES "Payer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_idPayerCorrect_fkey" FOREIGN KEY ("idPayerCorrect") REFERENCES "Payer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_idPayment_fkey" FOREIGN KEY ("idPayment") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategory" ADD CONSTRAINT "_ProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategory" ADD CONSTRAINT "_ProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
