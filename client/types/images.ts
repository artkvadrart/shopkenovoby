export interface iSelectedImages {  
    isNew: boolean;
    originalname: string; //sample: 25ee28cf-0a39-49e0-af76-53ab8f355ba9.jpeg
    ulid: string; //name file without extension sample: 01KCKK6T9NJ5NYQS0EBRSA07AF
    url: string; //forming  nameULID+webp  sample: /images/..../01KCKK6T9NJ5NYQS0EBRSA07AF.webp
    urlThumb: string; //forming  nameULID+THUMB+webp  sample: /images/..../01KCKK6T9NJ5NYQS0EBRSA07AFTHUMB.webp   
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