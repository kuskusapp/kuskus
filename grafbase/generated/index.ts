// This is a generated file. It should not be edited manually.
//
// You can decide to commit this file or add it to your `.gitignore`.
//
// By convention, this module is imported as `@grafbase/generated`. To make this syntax possible,
// add a `paths` entry to your `tsconfig.json`.
//
//  "compilerOptions": {
//    "paths": {
//      "@grafbase/generated": ["./grafbase/generated"]
//    }
//  }

export type Schema = {
  'Inline0': {
    __typename?: 'Inline0';
    field: boolean;
  };
  'Inline1': {
    __typename?: 'Inline1';
    field: boolean;
  };
  'Inline2': {
    __typename?: 'Inline2';
    public?: Schema['Inline0'] | null;
    auth?: Schema['Inline1'] | null;
  };
  'Query': {
    __typename?: 'Query';
    webIndex?: Schema['Inline2'];
  };
};

import { ResolverFn } from '@grafbase/sdk'

export type Resolver = {
  'Query.webIndex': ResolverFn<Schema['Query'], {  }, Schema['Inline2']>
}

