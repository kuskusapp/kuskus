CREATE MIGRATION m1frs5c2c5bj3s7dgvadpsrp75uqixrpmkbm5ggbrilzr5ilbcg5xa
    ONTO m1ltr45lawfv4cfmys467t5hr3vusimuaeukcydijfqizherfzlsza
{
  ALTER TYPE default::Post {
      ALTER PROPERTY photoId {
          RENAME TO roninId;
      };
  };
};
