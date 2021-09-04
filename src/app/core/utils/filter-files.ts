import { FileWithRelativePath } from "../interfaces/file-with-relative-path";
import { fileTypes } from "./fileTypes";

export const filterFiles = (files: FileList) => {
  const filteredFiles: (File | null)[] = [];
  for(let i = 0; i < files.length; i++) {
    if(files.item(i)) {
      const file = files.item(i)?.name.split('.');
      const fileExtension = file ? file[file.length - 1] : '';
      if(
        fileTypes[fileExtension] &&
        !(files.item(i) as FileWithRelativePath).webkitRelativePath.includes('node_modules') &&
        !(files.item(i) as FileWithRelativePath).webkitRelativePath.includes('dist') &&
        !(files.item(i) as FileWithRelativePath).webkitRelativePath.includes('build')
      ) {
        filteredFiles.push(files.item(i))
      }
    }
  }
  return filteredFiles;
}