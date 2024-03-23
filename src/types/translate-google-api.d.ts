declare module 'translate-google-api' {
  export default function translate(
    text: string | string[],
    options: {
      tld?: string;
      to?: string;
      from?: string;
      to?: string;
    },
  ): Promise<string>;
}
