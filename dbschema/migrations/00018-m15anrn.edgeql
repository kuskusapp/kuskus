CREATE MIGRATION m15anrn65t5fd4wrttqjtivoi3he3ukpnamxtudncury4relluuolq
    ONTO m1y5jkxx4tgnktjggsbi27ib3uleqgotrvx6krfvcbta4f7hsftqua
{
  ALTER TYPE default::Post {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.aiDescription);
  };
};
