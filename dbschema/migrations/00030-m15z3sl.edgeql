CREATE MIGRATION m15z3slb562ggvv743d22sqfafb2lnc74yxe7kkn7kpu7dxnfan7qa
    ONTO m1ggq4lw35cb7xy7sutkjr325n3rnsitrovtnqd4szwfb55m3ja72q
{
  ALTER TYPE default::Place {
      ALTER PROPERTY profileImageRoninId {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY profileImageUrl {
          RESET OPTIONALITY;
      };
  };
};
