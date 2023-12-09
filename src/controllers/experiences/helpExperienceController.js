import path from "path";
import { fileURLToPath } from "url";

const helpExperienceController = async (req, res) => {
  //   res.sendFile(path.dirname + "../../views/helpExperience.html");
  //   res.sendFile("helpExperience.html");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  //   const ruta = __dirname + "/../../views/helpExperience.html";
  const ruta = __dirname + "/helpExperience.html";

  console.log(ruta);
  res.sendFile(ruta);
};

export default helpExperienceController;
