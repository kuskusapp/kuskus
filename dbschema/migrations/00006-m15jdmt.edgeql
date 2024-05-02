CREATE MIGRATION m15jdmtnykr2vyxsbstabg7eil7q3iguvcu6yu3eixljdabbfyelvq
    ONTO m1vj35cynjv4gfdbkuagwak7xqigsa5b6ntktjryebafpuefyyirsq
{
  ALTER TYPE default::User {
      ALTER PROPERTY profilePhoto {
          RENAME TO profilePhotoUrl;
      };
  };
};
