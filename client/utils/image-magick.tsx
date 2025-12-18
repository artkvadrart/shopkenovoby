
import { Gravity, ImageMagick, MagickFormat, initializeImageMagick } from '@imagemagick/magick-wasm';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

export async function ImageMagickResize(
  wasmLocationNodeModules: string, // path to the wasm file '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm'
  buffer: Buffer, // the image buffer
  grayscale: boolean, // whether to convert the image to grayscale  
  quality: number = 75, // the quality of the image (default 75)
  width: number,  // the width of the image for Resize
  height: number,  // the height of the image for Resize
  rotate: number = 0,  // the rotation of the image 
  format: MagickFormat = 'WEBP', // the format of the image (webp, jpg, png, etc.)
  filePath: string, // the path to the image output (path.join(process.cwd(), 'public/uploads/', fileNameUlidHeroImage1280x720Webp);)  
) {
  const wasmLocation = `${process.cwd()}`+wasmLocationNodeModules;  
  const wasmBytes = readFileSync(wasmLocation);
  await initializeImageMagick(wasmBytes).then(() => {
    ImageMagick.read(buffer, async (image) => {
      console.log('ImageMagick initialized');    
      grayscale && image.grayscale(); 
      !!quality ?  image.quality = quality : image.quality = 75;
      width && height && image.resize(width, height);
      rotate && image.rotate(rotate);           
      format && format!='UNKNOWN' ? image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  }) : image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  });
    });
      })
 // throw new Error("Function ImageMagickResize Error.");
}

export async function ImageMagickThumbnail(
  wasmLocationNodeModules: string, // path to the wasm file '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm'
  buffer: Buffer, // the image buffer
  grayscale: boolean, // whether to convert the image to grayscale  
  quality: number = 75, // the quality of the image (default 75) 
  rotate: number = 0,  // the rotation of the image
  thumbnailSize: number = 300, // the size of the thumbnail (squared)
  format: MagickFormat = 'WEBP', // the format of the image (webp, jpg, png, etc.)
  filePath: string, // the path to the image output (path.join(process.cwd(), 'public/uploads/', fileNameUlidHeroImage1280x720Webp);)
) {
  const wasmLocation = `${process.cwd()}`+wasmLocationNodeModules;  
  const wasmBytes = readFileSync(wasmLocation);
  await initializeImageMagick(wasmBytes).then(() => {
    ImageMagick.read(buffer, (image) => {
      console.log('ImageMagick initialized2');    
      grayscale && image.grayscale(); 
      !!quality ?  image.quality = quality : image.quality = 75;     
      rotate && image.rotate(rotate);      
      // thumbnailSize && image.resize(thumbnailSize, thumbnailSize);
      // thumbnailSize && image.resize( {
      //   width: thumbnailSize, height: thumbnailSize, aspectRatio: true, 	fillArea: false,	greater: false,  
	    //   ignoreAspectRatio: true, isPercentage: false, less: false,	limitPixels: true, x: 1, 	y: 1 } );
      // image.adaptiveResize(thumbnailSize, thumbnailSize);
      thumbnailSize && image.thumbnail(thumbnailSize, thumbnailSize) 
      // thumbnailSize && image.crop(thumbnailSize, thumbnailSize, 5);      
      format && format!='UNKNOWN' ? image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  }) : image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  });
    });
      })
 // throw new Error("Function ImageMagickThumbnail Error.");
}







// export async function ImageMagickThumbnail(
//   wasmLocationNodeModules: string, // path to the wasm file '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm'
//   buffer: Buffer, // the image buffer
//   grayscale: boolean, // whether to convert the image to grayscale  
//   quality: number = 75, // the quality of the image (default 75) 
//   rotate: number = 0,  // the rotation of the image
//   thumbnailSize: number = 300, // the size of the thumbnail (squared)
//   format: MagickFormat = 'WEBP', // the format of the image (webp, jpg, png, etc.)
//   filePath: string, // the path to the image output (path.join(process.cwd(), 'public/uploads/', fileNameUlidHeroImage1280x720Webp);)
// ) {
//   const wasmLocation = `${process.cwd()}`+wasmLocationNodeModules;  
//   const wasmBytes = readFileSync(wasmLocation);
//   await initializeImageMagick(wasmBytes)
//   .then(() => {
//     ImageMagick.read(buffer, (image) => {
//       console.log('ImageMagick initialized2');    
//       grayscale && image.grayscale(); 
//       !!quality ?  image.quality = quality : image.quality = 75;     
//       rotate && image.rotate(rotate)
//       image.resize(thumbnailSize, thumbnailSize);
//     })  
//   })
//       .then 
//       ((image) => {
//         ImageMagick.read(buffer, (image) => {
//       console.log('ImageMagick initialized3');
//       image.crop(thumbnailSize, thumbnailSize, 5);
//       format && format!='UNKNOWN' ? image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  }) : image.write(format, (data) => { writeFile(filePath, Buffer.from(data));  });
//     })  
//       }) 
//  // throw new Error("Function ImageMagickThumbnail Error.");
// }
