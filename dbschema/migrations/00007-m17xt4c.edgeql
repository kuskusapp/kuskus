CREATE MIGRATION m17xt4cdazj2ska2apv5z56qu4ltlhxwaegnursho4e62z2b3gq2vq
    ONTO m15jdmtnykr2vyxsbstabg7eil7q3iguvcu6yu3eixljdabbfyelvq
{
  ALTER TYPE default::Post {
      DROP PROPERTY name;
  };
};
