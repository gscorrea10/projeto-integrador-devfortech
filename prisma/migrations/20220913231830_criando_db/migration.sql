-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "vehicle_state" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "vehicles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ait" TEXT NOT NULL,
    "infraction_date" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "code_ctb" TEXT NOT NULL,
    "infraction_uf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "id_vehicle" TEXT NOT NULL,
    "process_status" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "usersId" TEXT,
    CONSTRAINT "process_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "process_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auto" TEXT NOT NULL,
    "data_hora" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cnh_points" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "id_vehicle" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "usersId" TEXT,
    CONSTRAINT "bills_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_cnh_key" ON "users"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_key" ON "vehicles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_license_plate_key" ON "vehicles"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_renavam_key" ON "vehicles"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "process_id_key" ON "process"("id");

-- CreateIndex
CREATE UNIQUE INDEX "process_ait_key" ON "process"("ait");

-- CreateIndex
CREATE UNIQUE INDEX "process_code_key" ON "process"("code");

-- CreateIndex
CREATE UNIQUE INDEX "bills_id_key" ON "bills"("id");
