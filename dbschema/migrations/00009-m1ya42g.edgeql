CREATE MIGRATION m1ya42guqupeqoyswhqva7hwa5keu6gdbzwpfahonrrdj2nqoalsfa
    ONTO m1v4j7xhql37x2ysxwddfccwyw66qbsbxonbuaotaewt5ewnpa5wca
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY name {
          RESET OPTIONALITY;
      };
  };
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  ALTER TYPE default::Place {
      ALTER PROPERTY profilePhoto {
          RENAME TO profilePhotoUrl;
      };
  };
};
