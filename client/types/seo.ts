export interface ISeo {
  metadataBase : string,
  title: string; // max 60-70 characters (recomend), not use keywords     
  description: string; // max 150-170 (yandex 300-350) characters (recomend), not use keywords
  abstract: string;  // max 10 words
  keywords: string;  // max 10 words sample: work, lingvo, Warszawa, auto
  applicationName: string;
  // h1: string; // see html content    
  authorName: string;
  authorUrl: string;
  generator: string;
  referrer: string;
  themeColor : string;
  colorScheme: string;
  
  urlOpenGraph: string;
  titleOpenGraph: string;
  descriptionOpenGraph: string;
  siteNameOpenGraph: string;
  imagesOpenGraph:  string;

  cardTwitter: "summary" | "summary_large_image" | "player" | "app" | undefined;
  siteTwitter: string;
  creatorTwitter: string;
  titleTwitter: string;
  descriptionTwitter : string | undefined; 
  imagesTwitter: string; 

  googleVerification: string;
  yandexVerification: string;

  capableAppleWebApp: boolean; 
  titleAppleWebApp: string; 
  statusBarStyleAppleWebApp: "default" | "black" | "black-translucent" | undefined; // "black-translucent"
 
  indexRobots : boolean; 
  followRobots : boolean;

  manifest : URL;
  iconIcon : URL;
  iconShortcut : URL;
  iconApple : URL;
}