CREATE MIGRATION m1ltr45lawfv4cfmys467t5hr3vusimuaeukcydijfqizherfzlsza
    ONTO m15anrn65t5fd4wrttqjtivoi3he3ukpnamxtudncury4relluuolq
{
  ALTER TYPE default::Post {
      CREATE REQUIRED PROPERTY photoId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
