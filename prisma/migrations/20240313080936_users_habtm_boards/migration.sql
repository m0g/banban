-- CreateTable
CREATE TABLE "_BoardToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BoardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Board" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BoardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardToUser_AB_unique" ON "_BoardToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardToUser_B_index" ON "_BoardToUser"("B");
