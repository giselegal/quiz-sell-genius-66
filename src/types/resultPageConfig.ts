
export interface ResultPageConfig {
  styleType: string;
  heroSection: {
    title: string;
    subtitle: string;
    backgroundColor: string;
  };
  mainContent: {
    primaryStyle: {
      title: string;
      backgroundColor: string;
    };
    secondaryStyles: {
      title: string;
      backgroundColor: string;
    };
  };
  offerSection: {
    title: string;
    subtitle: string;
    backgroundColor: string;
  };
  blocks: any[];
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}
