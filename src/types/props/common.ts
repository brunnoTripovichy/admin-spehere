export interface ComponentProps {
  params: {
    lng: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// This interface matches what Next.js expects for page components
export interface PageProps {
  params: {
    lng: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
