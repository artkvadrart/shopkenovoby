export interface iSelectedImages {  
    ulid: string;
    url: string;
    urlThumb: string;    
}

export interface iListFoldersFiles {  
    id: string; // ulid
    isFile: boolean; // true-file, false-directory
    isThumbnail: boolean;
//    metadata: iMetadata;
    relativePath: string | null;
    name: string;
    extension: string;
    url: string;
    type: string | null;
    // size: number | null;
    // width: number | null;
    // height: number | null;
    createdAt: string;
    
}

export interface iMetadata {
    relativePath: string | null;
    name: string;
    extension: string;
    url: string;
    type: string | null;
    size: number | null;
    width: number | null;
    height: number | null;
    createdAt: string;
  }