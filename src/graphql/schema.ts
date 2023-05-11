import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type CheckoutSession = {
  __typename?: "CheckoutSession"
  url: Scalars["String"]
}

/** Possible operations for an Int field */
export type IntOperationsInput = {
  decrement?: InputMaybe<Scalars["Int"]>
  increment?: InputMaybe<Scalars["Int"]>
  set?: InputMaybe<Scalars["Int"]>
}

export type Mutation = {
  __typename?: "Mutation"
  /** Create a Settings */
  settingsCreate?: Maybe<SettingsCreatePayload>
  /** Delete a Settings by ID or unique field */
  settingsDelete?: Maybe<SettingsDeletePayload>
  /** Update a Settings */
  settingsUpdate?: Maybe<SettingsUpdatePayload>
  /** Create a Subtask */
  subtaskCreate?: Maybe<SubtaskCreatePayload>
  /** Delete a Subtask by ID or unique field */
  subtaskDelete?: Maybe<SubtaskDeletePayload>
  /** Update a Subtask */
  subtaskUpdate?: Maybe<SubtaskUpdatePayload>
  /** Create a Todo */
  todoCreate?: Maybe<TodoCreatePayload>
  /** Delete a Todo by ID or unique field */
  todoDelete?: Maybe<TodoDeletePayload>
  /** Update a Todo */
  todoUpdate?: Maybe<TodoUpdatePayload>
  /** Create a UserDetails */
  userDetailsCreate?: Maybe<UserDetailsCreatePayload>
  /** Delete a UserDetails by ID or unique field */
  userDetailsDelete?: Maybe<UserDetailsDeletePayload>
  /** Update a UserDetails */
  userDetailsUpdate?: Maybe<UserDetailsUpdatePayload>
}

export type MutationSettingsCreateArgs = {
  input: SettingsCreateInput
}

export type MutationSettingsDeleteArgs = {
  by: SettingsByInput
}

export type MutationSettingsUpdateArgs = {
  by: SettingsByInput
  input: SettingsUpdateInput
}

export type MutationSubtaskCreateArgs = {
  input: SubtaskCreateInput
}

export type MutationSubtaskDeleteArgs = {
  by: SubtaskByInput
}

export type MutationSubtaskUpdateArgs = {
  by: SubtaskByInput
  input: SubtaskUpdateInput
}

export type MutationTodoCreateArgs = {
  input: TodoCreateInput
}

export type MutationTodoDeleteArgs = {
  by: TodoByInput
}

export type MutationTodoUpdateArgs = {
  by: TodoByInput
  input: TodoUpdateInput
}

export type MutationUserDetailsCreateArgs = {
  input: UserDetailsCreateInput
}

export type MutationUserDetailsDeleteArgs = {
  by: UserDetailsByInput
}

export type MutationUserDetailsUpdateArgs = {
  by: UserDetailsByInput
  input: UserDetailsUpdateInput
}

export enum OrderByDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["String"]>
  hasNextPage: Scalars["Boolean"]
  hasPreviousPage: Scalars["Boolean"]
  startCursor?: Maybe<Scalars["String"]>
}

export type Query = {
  __typename?: "Query"
  /** Query a single Settings by an ID or a unique field */
  settings?: Maybe<Settings>
  /** Paginated query to fetch the whole list of `Settings`. */
  settingsCollection?: Maybe<SettingsConnection>
  /** Query a single Subtask by an ID or a unique field */
  subtask?: Maybe<Subtask>
  /** Paginated query to fetch the whole list of `Subtask`. */
  subtaskCollection?: Maybe<SubtaskConnection>
  suggestions?: Maybe<SuggestionsPayload>
  /** Query a single Todo by an ID or a unique field */
  todo?: Maybe<Todo>
  /** Paginated query to fetch the whole list of `Todo`. */
  todoCollection?: Maybe<TodoConnection>
  /** Query a single UserDetails by an ID or a unique field */
  userDetails?: Maybe<UserDetails>
  /** Paginated query to fetch the whole list of `UserDetails`. */
  userDetailsCollection?: Maybe<UserDetailsConnection>
}

export type QuerySettingsArgs = {
  by: SettingsByInput
}

export type QuerySettingsCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<SettingsOrderByInput>
}

export type QuerySubtaskArgs = {
  by: SubtaskByInput
}

export type QuerySubtaskCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<SubtaskOrderByInput>
}

export type QuerySuggestionsArgs = {
  task: Scalars["String"]
}

export type QueryTodoArgs = {
  by: TodoByInput
}

export type QueryTodoCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<TodoOrderByInput>
}

export type QueryUserDetailsArgs = {
  by: UserDetailsByInput
}

export type QueryUserDetailsCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<UserDetailsOrderByInput>
}

export type Settings = {
  __typename?: "Settings"
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  hideActionBar: Scalars["Boolean"]
  iconOnlySidebar: Scalars["Boolean"]
  /** Unique identifier */
  id: Scalars["ID"]
  languageModelUsed: Scalars["String"]
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
}

export type SettingsByInput = {
  id?: InputMaybe<Scalars["ID"]>
}

export type SettingsConnection = {
  __typename?: "SettingsConnection"
  edges?: Maybe<Array<Maybe<SettingsEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a Settings */
export type SettingsCreateInput = {
  hideActionBar?: Scalars["Boolean"]
  iconOnlySidebar?: Scalars["Boolean"]
  languageModelUsed?: Scalars["String"]
}

export type SettingsCreatePayload = {
  __typename?: "SettingsCreatePayload"
  settings?: Maybe<Settings>
}

export type SettingsDeletePayload = {
  __typename?: "SettingsDeletePayload"
  deletedId: Scalars["ID"]
}

export type SettingsEdge = {
  __typename?: "SettingsEdge"
  cursor: Scalars["String"]
  node: Settings
}

export type SettingsOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>
}

/** Input to update a Settings */
export type SettingsUpdateInput = {
  hideActionBar?: InputMaybe<Scalars["Boolean"]>
  iconOnlySidebar?: InputMaybe<Scalars["Boolean"]>
  languageModelUsed?: InputMaybe<Scalars["String"]>
}

export type SettingsUpdatePayload = {
  __typename?: "SettingsUpdatePayload"
  settings?: Maybe<Settings>
}

export type Subtask = {
  __typename?: "Subtask"
  cached?: Maybe<Scalars["String"]>
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  done: Scalars["Boolean"]
  dueDate?: Maybe<Scalars["String"]>
  /** Unique identifier */
  id: Scalars["ID"]
  note?: Maybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
  title: Scalars["String"]
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
}

export type SubtaskByInput = {
  id?: InputMaybe<Scalars["ID"]>
}

export type SubtaskConnection = {
  __typename?: "SubtaskConnection"
  edges?: Maybe<Array<Maybe<SubtaskEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a Subtask */
export type SubtaskCreateInput = {
  cached?: InputMaybe<Scalars["String"]>
  done?: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority?: Scalars["Int"]
  starred?: Scalars["Boolean"]
  title: Scalars["String"]
}

export type SubtaskCreatePayload = {
  __typename?: "SubtaskCreatePayload"
  subtask?: Maybe<Subtask>
}

export type SubtaskDeletePayload = {
  __typename?: "SubtaskDeletePayload"
  deletedId: Scalars["ID"]
}

export type SubtaskEdge = {
  __typename?: "SubtaskEdge"
  cursor: Scalars["String"]
  node: Subtask
}

export type SubtaskOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>
}

/** Input to create a Subtask for the SubtaskToTodo relation of Todo */
export type SubtaskToTodoCreateSubtask = {
  cached?: InputMaybe<Scalars["String"]>
  done?: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority?: Scalars["Int"]
  starred?: Scalars["Boolean"]
  title: Scalars["String"]
}

/** Input to link to or create a Subtask for the SubtaskToTodo relation of Todo */
export type SubtaskToTodoCreateSubtaskRelation = {
  create?: InputMaybe<SubtaskToTodoCreateSubtask>
  link?: InputMaybe<Scalars["ID"]>
}

/** Input to link/unlink to or create a Subtask for the SubtaskToTodo relation of Todo */
export type SubtaskToTodoUpdateSubtaskRelation = {
  create?: InputMaybe<SubtaskToTodoCreateSubtask>
  link?: InputMaybe<Scalars["ID"]>
  unlink?: InputMaybe<Scalars["ID"]>
}

/** Input to update a Subtask */
export type SubtaskUpdateInput = {
  cached?: InputMaybe<Scalars["String"]>
  done?: InputMaybe<Scalars["Boolean"]>
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority?: InputMaybe<IntOperationsInput>
  starred?: InputMaybe<Scalars["Boolean"]>
  title?: InputMaybe<Scalars["String"]>
}

export type SubtaskUpdatePayload = {
  __typename?: "SubtaskUpdatePayload"
  subtask?: Maybe<Subtask>
}

export type SuggestedTask = {
  __typename?: "SuggestedTask"
  note: Scalars["String"]
  title: Scalars["String"]
}

export type SuggestionsPayload = {
  __typename?: "SuggestionsPayload"
  stripeCheckoutUrl?: Maybe<CheckoutSession>
  suggestedTasks?: Maybe<Array<Maybe<SuggestedTask>>>
}

export type Todo = {
  __typename?: "Todo"
  cached?: Maybe<Scalars["String"]>
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  done: Scalars["Boolean"]
  dueDate?: Maybe<Scalars["String"]>
  /** Unique identifier */
  id: Scalars["ID"]
  labels?: Maybe<Array<Maybe<Scalars["String"]>>>
  note?: Maybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
  subtasks?: Maybe<SubtaskConnection>
  title: Scalars["String"]
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
}

export type TodoSubtasksArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<TodoOrderByInput>
}

export type TodoByInput = {
  id?: InputMaybe<Scalars["ID"]>
}

export type TodoConnection = {
  __typename?: "TodoConnection"
  edges?: Maybe<Array<Maybe<TodoEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a Todo */
export type TodoCreateInput = {
  cached?: InputMaybe<Scalars["String"]>
  done?: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  labels?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  note?: InputMaybe<Scalars["String"]>
  priority?: Scalars["Int"]
  starred?: Scalars["Boolean"]
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskToTodoCreateSubtaskRelation>>>
  title: Scalars["String"]
}

export type TodoCreatePayload = {
  __typename?: "TodoCreatePayload"
  todo?: Maybe<Todo>
}

export type TodoDeletePayload = {
  __typename?: "TodoDeletePayload"
  deletedId: Scalars["ID"]
}

export type TodoEdge = {
  __typename?: "TodoEdge"
  cursor: Scalars["String"]
  node: Todo
}

export type TodoOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>
}

/** Input to update a Todo */
export type TodoUpdateInput = {
  cached?: InputMaybe<Scalars["String"]>
  done?: InputMaybe<Scalars["Boolean"]>
  dueDate?: InputMaybe<Scalars["String"]>
  labels?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  note?: InputMaybe<Scalars["String"]>
  priority?: InputMaybe<IntOperationsInput>
  starred?: InputMaybe<Scalars["Boolean"]>
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskToTodoUpdateSubtaskRelation>>>
  title?: InputMaybe<Scalars["String"]>
}

export type TodoUpdatePayload = {
  __typename?: "TodoUpdatePayload"
  todo?: Maybe<Todo>
}

export type UserDetails = {
  __typename?: "UserDetails"
  aiTasksAvailable?: Maybe<Scalars["Int"]>
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  /** Unique identifier */
  id: Scalars["ID"]
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
  username?: Maybe<Scalars["String"]>
}

export type UserDetailsByInput = {
  id?: InputMaybe<Scalars["ID"]>
}

export type UserDetailsConnection = {
  __typename?: "UserDetailsConnection"
  edges?: Maybe<Array<Maybe<UserDetailsEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a UserDetails */
export type UserDetailsCreateInput = {
  aiTasksAvailable?: InputMaybe<Scalars["Int"]>
  username?: InputMaybe<Scalars["String"]>
}

export type UserDetailsCreatePayload = {
  __typename?: "UserDetailsCreatePayload"
  userDetails?: Maybe<UserDetails>
}

export type UserDetailsDeletePayload = {
  __typename?: "UserDetailsDeletePayload"
  deletedId: Scalars["ID"]
}

export type UserDetailsEdge = {
  __typename?: "UserDetailsEdge"
  cursor: Scalars["String"]
  node: UserDetails
}

export type UserDetailsOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>
}

/** Input to update a UserDetails */
export type UserDetailsUpdateInput = {
  aiTasksAvailable?: InputMaybe<IntOperationsInput>
  username?: InputMaybe<Scalars["String"]>
}

export type UserDetailsUpdatePayload = {
  __typename?: "UserDetailsUpdatePayload"
  userDetails?: Maybe<UserDetails>
}

export type TodoFragment = {
  __typename?: "Todo"
  id: string
  title: string
  done: boolean
  starred: boolean
  priority: number
  note?: string | null
  dueDate?: string | null
}

export type SubtaskFragment = {
  __typename?: "Subtask"
  id: string
  title: string
  done: boolean
  starred: boolean
  priority: number
  note?: string | null
  dueDate?: string | null
}

export type TodosQueryVariables = Exact<{ [key: string]: never }>

export type TodosQuery = {
  __typename?: "Query"
  todoCollection?: {
    __typename?: "TodoConnection"
    edges?: Array<{
      __typename?: "TodoEdge"
      node: {
        __typename?: "Todo"
        id: string
        title: string
        done: boolean
        starred: boolean
        priority: number
        note?: string | null
        dueDate?: string | null
        subtasks?: {
          __typename?: "SubtaskConnection"
          edges?: Array<{
            __typename?: "SubtaskEdge"
            node: {
              __typename?: "Subtask"
              id: string
              title: string
              done: boolean
              starred: boolean
              priority: number
              note?: string | null
              dueDate?: string | null
            }
          } | null> | null
        } | null
      }
    } | null> | null
  } | null
}

export type TodoCreateMutationVariables = Exact<{
  todo: TodoCreateInput
}>

export type TodoCreateMutation = {
  __typename?: "Mutation"
  todoCreate?: {
    __typename?: "TodoCreatePayload"
    todo?: { __typename?: "Todo"; id: string } | null
  } | null
}

export type TodoUpdateMutationVariables = Exact<{
  id: Scalars["ID"]
  todo: TodoUpdateInput
}>

export type TodoUpdateMutation = {
  __typename?: "Mutation"
  todoUpdate?: {
    __typename?: "TodoUpdatePayload"
    todo?: { __typename?: "Todo"; id: string } | null
  } | null
}

export type TodoDeleteMutationVariables = Exact<{
  id: Scalars["ID"]
}>

export type TodoDeleteMutation = {
  __typename?: "Mutation"
  todoDelete?: { __typename?: "TodoDeletePayload"; deletedId: string } | null
}

export type SubtaskLinkMutationVariables = Exact<{
  taskId: Scalars["ID"]
  subtaskId: Scalars["ID"]
}>

export type SubtaskLinkMutation = {
  __typename?: "Mutation"
  todoUpdate?: {
    __typename?: "TodoUpdatePayload"
    todo?: { __typename?: "Todo"; id: string } | null
  } | null
}

export type SubtasksQueryVariables = Exact<{ [key: string]: never }>

export type SubtasksQuery = {
  __typename?: "Query"
  subtaskCollection?: {
    __typename?: "SubtaskConnection"
    edges?: Array<{
      __typename?: "SubtaskEdge"
      node: { __typename?: "Subtask"; id: string; title: string }
    } | null> | null
  } | null
}

export type SubtaskCreateMutationVariables = Exact<{
  subtask: SubtaskCreateInput
}>

export type SubtaskCreateMutation = {
  __typename?: "Mutation"
  subtaskCreate?: {
    __typename?: "SubtaskCreatePayload"
    subtask?: { __typename?: "Subtask"; id: string } | null
  } | null
}

export type SubtaskUpdateMutationVariables = Exact<{
  id: Scalars["ID"]
  subtask: SubtaskUpdateInput
}>

export type SubtaskUpdateMutation = {
  __typename?: "Mutation"
  subtaskUpdate?: {
    __typename?: "SubtaskUpdatePayload"
    subtask?: { __typename?: "Subtask"; id: string } | null
  } | null
}

export type SubtaskDeleteMutationVariables = Exact<{
  id: Scalars["ID"]
}>

export type SubtaskDeleteMutation = {
  __typename?: "Mutation"
  subtaskDelete?: {
    __typename?: "SubtaskDeletePayload"
    deletedId: string
  } | null
}

export type UserDetailsQueryVariables = Exact<{ [key: string]: never }>

export type UserDetailsQuery = {
  __typename?: "Query"
  userDetailsCollection?: {
    __typename?: "UserDetailsConnection"
    edges?: Array<{
      __typename?: "UserDetailsEdge"
      node: {
        __typename?: "UserDetails"
        id: string
        username?: string | null
        aiTasksAvailable?: number | null
      }
    } | null> | null
  } | null
}

export type UserDetailsCreateMutationVariables = Exact<{
  userDetails: UserDetailsCreateInput
}>

export type UserDetailsCreateMutation = {
  __typename?: "Mutation"
  userDetailsCreate?: {
    __typename?: "UserDetailsCreatePayload"
    userDetails?: { __typename?: "UserDetails"; id: string } | null
  } | null
}

export type UserDetailsUpdateMutationVariables = Exact<{
  id: Scalars["ID"]
  userDetails: UserDetailsUpdateInput
}>

export type UserDetailsUpdateMutation = {
  __typename?: "Mutation"
  userDetailsUpdate?: {
    __typename?: "UserDetailsUpdatePayload"
    userDetails?: { __typename?: "UserDetails"; id: string } | null
  } | null
}

export type SettingsQueryVariables = Exact<{ [key: string]: never }>

export type SettingsQuery = {
  __typename?: "Query"
  settingsCollection?: {
    __typename?: "SettingsConnection"
    edges?: Array<{
      __typename?: "SettingsEdge"
      node: {
        __typename?: "Settings"
        id: string
        hideActionBar: boolean
        iconOnlySidebar: boolean
        languageModelUsed: string
      }
    } | null> | null
  } | null
}

export type SettingsCreateMutationVariables = Exact<{
  settings: SettingsCreateInput
}>

export type SettingsCreateMutation = {
  __typename?: "Mutation"
  settingsCreate?: {
    __typename?: "SettingsCreatePayload"
    settings?: { __typename?: "Settings"; id: string } | null
  } | null
}

export type SettingsUpdateMutationVariables = Exact<{
  id: Scalars["ID"]
  settings: SettingsUpdateInput
}>

export type SettingsUpdateMutation = {
  __typename?: "Mutation"
  settingsUpdate?: {
    __typename?: "SettingsUpdatePayload"
    settings?: { __typename?: "Settings"; id: string } | null
  } | null
}

export type SuggestedTasksQueryVariables = Exact<{
  task: Scalars["String"]
}>

export type SuggestedTasksQuery = {
  __typename?: "Query"
  suggestions?: {
    __typename?: "SuggestionsPayload"
    suggestedTasks?: Array<{
      __typename?: "SuggestedTask"
      title: string
      note: string
    } | null> | null
  } | null
}

export const TodoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Todo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Todo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "done" } },
          { kind: "Field", name: { kind: "Name", value: "starred" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          { kind: "Field", name: { kind: "Name", value: "note" } },
          { kind: "Field", name: { kind: "Name", value: "dueDate" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodoFragment, unknown>
export const SubtaskFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Subtask" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Subtask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "done" } },
          { kind: "Field", name: { kind: "Name", value: "starred" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          { kind: "Field", name: { kind: "Name", value: "note" } },
          { kind: "Field", name: { kind: "Name", value: "dueDate" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubtaskFragment, unknown>
export const TodosDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Todos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todoCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "Todo" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtasks" },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: { kind: "Name", value: "first" },
                                  value: { kind: "IntValue", value: "20" },
                                },
                              ],
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "edges" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "node" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "FragmentSpread",
                                                name: {
                                                  kind: "Name",
                                                  value: "Subtask",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Todo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Todo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "done" } },
          { kind: "Field", name: { kind: "Name", value: "starred" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          { kind: "Field", name: { kind: "Name", value: "note" } },
          { kind: "Field", name: { kind: "Name", value: "dueDate" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Subtask" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Subtask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "done" } },
          { kind: "Field", name: { kind: "Name", value: "starred" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          { kind: "Field", name: { kind: "Name", value: "note" } },
          { kind: "Field", name: { kind: "Name", value: "dueDate" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodosQuery, TodosQueryVariables>
export const TodoCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TodoCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "todo" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TodoCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todoCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "todo" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "todo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodoCreateMutation, TodoCreateMutationVariables>
export const TodoUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TodoUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "todo" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TodoUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todoUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "todo" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "todo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodoUpdateMutation, TodoUpdateMutationVariables>
export const TodoDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TodoDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todoDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodoDeleteMutation, TodoDeleteMutationVariables>
export const SubtaskLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubtaskLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "taskId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "subtaskId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todoUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "taskId" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "subtasks" },
                      value: {
                        kind: "ListValue",
                        values: [
                          {
                            kind: "ObjectValue",
                            fields: [
                              {
                                kind: "ObjectField",
                                name: { kind: "Name", value: "link" },
                                value: {
                                  kind: "Variable",
                                  name: { kind: "Name", value: "subtaskId" },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "todo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubtaskLinkMutation, SubtaskLinkMutationVariables>
export const SubtasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Subtasks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subtaskCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubtasksQuery, SubtasksQueryVariables>
export const SubtaskCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubtaskCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "subtask" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SubtaskCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subtaskCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "subtask" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subtask" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubtaskCreateMutation,
  SubtaskCreateMutationVariables
>
export const SubtaskUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubtaskUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "subtask" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SubtaskUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subtaskUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "subtask" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subtask" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubtaskUpdateMutation,
  SubtaskUpdateMutationVariables
>
export const SubtaskDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubtaskDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subtaskDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubtaskDeleteMutation,
  SubtaskDeleteMutationVariables
>
export const UserDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserDetails" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDetailsCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "aiTasksAvailable" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailsQuery, UserDetailsQueryVariables>
export const UserDetailsCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserDetailsCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userDetails" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserDetailsCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDetailsCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userDetails" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "userDetails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserDetailsCreateMutation,
  UserDetailsCreateMutationVariables
>
export const UserDetailsUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserDetailsUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userDetails" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserDetailsUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDetailsUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userDetails" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "userDetails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserDetailsUpdateMutation,
  UserDetailsUpdateMutationVariables
>
export const SettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Settings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "settingsCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hideActionBar" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "iconOnlySidebar" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "languageModelUsed",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>
export const SettingsCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SettingsCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "settings" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SettingsCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "settingsCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "settings" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "settings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SettingsCreateMutation,
  SettingsCreateMutationVariables
>
export const SettingsUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SettingsUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "settings" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SettingsUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "settingsUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "settings" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "settings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SettingsUpdateMutation,
  SettingsUpdateMutationVariables
>
export const SuggestedTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SuggestedTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "task" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "suggestions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "task" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "task" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "suggestedTasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "note" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SuggestedTasksQuery, SuggestedTasksQueryVariables>
