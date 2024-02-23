const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const directoryPath = "C:\\Users\\jhonata.nogueira\\Desktop\\compressor\\Fotos";
const optimizedDirectoryPath = path.join(directoryPath, "otimizado");

const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff"]);

if (!fs.existsSync(optimizedDirectoryPath)) {
  fs.mkdirSync(optimizedDirectoryPath, { recursive: true });
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Erro ao ler o diretório:", err);
    return;
  }

  files.forEach((file) => {
    const extension = path.extname(file).toLowerCase();
    if (!validExtensions.has(extension)) {
      console.log(`Ignorando arquivo não suportado: ${file}`);
      return;
    }

    const filePath = path.join(directoryPath, file);
    const outputFilePath = path.join(optimizedDirectoryPath, file);

    sharp(filePath)
      .resize(500, 500, {
        fit: "contain",
      })
      .png({ quality: 50, compressionLevel: 9 })
      .withMetadata({ density: 72 })
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.log(`Erro ao processar a imagem ${file}:`, err.message);
          return;
        }
        console.log("Imagem processada com sucesso:", file, info);
      });
  });
});
