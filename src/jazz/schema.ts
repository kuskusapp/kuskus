import { Account, CoMap, Group, Profile, co } from "jazz-tools"

export class Container extends CoMap {}

export class AccountRoot extends CoMap {
  container = co.ref(Container)
  version = co.optional.number
}

export class UserProfile extends Profile {
  name = co.string

  static validate(data: { name?: string; other?: Record<string, unknown> }) {
    const errors: string[] = []
    if (!data.name?.trim()) {
      errors.push("Please enter a name")
    }
    return { errors }
  }
}

export class JazzAccount extends Account {
  profile = co.ref(UserProfile)
  root = co.ref(AccountRoot)
  async migrate(creationProps?: {
    name: string
    other?: Record<string, unknown>
  }) {
    if (!this._refs.root && creationProps) {
      await this.initialMigration(creationProps)
      return
    }
    // uncomment this to add migrations
    // const currentVersion = this.root?.version || 0;
    // if (currentVersion < 1) {
    //   await this.migrationV1();
    // }
  }

  private async initialMigration(creationProps: {
    name: string
    other?: Record<string, unknown>
  }) {
    const { name, other } = creationProps
    const profileErrors = UserProfile.validate({ name, ...other })
    if (profileErrors.errors.length > 0) {
      throw new Error(
        `Invalid profile data: ${profileErrors.errors.join(", ")}`,
      )
    }

    const publicGroup = Group.create({ owner: this })
    publicGroup.addMember("everyone", "reader")

    this.profile = UserProfile.create(
      { name, ...other },
      { owner: publicGroup },
    )

    const privateGroup = Group.create({ owner: this })

    // create initial container with empty collections
    const defaultContainer = Container.create({}, { owner: privateGroup })

    // initialize root structure with version
    this.root = AccountRoot.create(
      {
        container: defaultContainer,
        version: 0,
        // here owner is always "this" Account
      },
      { owner: this },
    )
  }
}
