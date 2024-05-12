CREATE MIGRATION m1mlcgumhkh5g5uncus7mqljscvj3ipajrfz6gliiceffzlevn2wuq
    ONTO m1wmsxwi2dtuyspn5aeqbunuznhqhyys5soxklzn34wdf3tfgtw2wa
{
  ALTER TYPE default::Post {
      CREATE INDEX fts::index ON (fts::with_options(.description, language := fts::Language.eng));
  };
};
