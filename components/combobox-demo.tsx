"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Icon } from "./ui/icon";

const countries = [
  { code: "", value: "", label: "Select country" },
  { code: "ar", value: "argentina", label: "Argentina" },
  { code: "au", value: "australia", label: "Australia" },
  { code: "br", value: "brazil", label: "Brazil" },
  { code: "ca", value: "canada", label: "Canada" },
  { code: "fr", value: "france", label: "France" },
  { code: "de", value: "germany", label: "Germany" },
  { code: "jp", value: "japan", label: "Japan" },
  { code: "us", value: "united-states", label: "United States" },
];

export function ComboboxPopupDemo() {
  return (
    <Combobox items={countries} >
      <ComboboxTrigger className="w-64 ">
        <Icon name="category" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxPrimaryFlatDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="primary-flat" className="w-64">
        <Icon name="category" className="text-primary-med-em" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxGhostDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="ghost" className="w-64">
        <Icon name="category" className="text-muted-foreground" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxOutlineDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="outline" className="w-64">
        <Icon name="category" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxGroupedDemo() {
  return (
    <Combobox defaultValue="next">
      <ComboboxTrigger className="w-64">
        <ComboboxValue placeholder="Select a product" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            <ComboboxItem value="next">Next.js</ComboboxItem>
            <ComboboxItem value="nuxt">Nuxt</ComboboxItem>
            <ComboboxItem value="remix">Remix</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Platforms</ComboboxLabel>
            <ComboboxItem value="vercel">Vercel</ComboboxItem>
            <ComboboxItem value="netlify">Netlify</ComboboxItem>
            <ComboboxItem value="cloudflare">Cloudflare</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
