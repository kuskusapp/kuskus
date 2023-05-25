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
  Date: any
  DateTime: any
}

/** Possible operations for an Int field */
export type IntOperationsInput = {
  decrement?: InputMaybe<Scalars["Int"]>
  increment?: InputMaybe<Scalars["Int"]>
  set?: InputMaybe<Scalars["Int"]>
}

export type Mutation = {
  __typename?: "Mutation"
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
  /** Create a User */
  userCreate?: Maybe<UserCreatePayload>
  /** Delete a User by ID or unique field */
  userDelete?: Maybe<UserDeletePayload>
  /** Update a User */
  userUpdate?: Maybe<UserUpdatePayload>
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

export type MutationUserCreateArgs = {
  input: UserCreateInput
}

export type MutationUserDeleteArgs = {
  by: UserByInput
}

export type MutationUserUpdateArgs = {
  by: UserByInput
  input: UserUpdateInput
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
  /** Query a single Subtask by an ID or a unique field */
  subtask?: Maybe<Subtask>
  /** Paginated query to fetch the whole list of `Subtask`. */
  subtaskCollection?: Maybe<SubtaskConnection>
  /** Query a single Todo by an ID or a unique field */
  todo?: Maybe<Todo>
  /** Paginated query to fetch the whole list of `Todo`. */
  todoCollection?: Maybe<TodoConnection>
  /** Query a single User by an ID or a unique field */
  user?: Maybe<User>
  /** Paginated query to fetch the whole list of `User`. */
  userCollection?: Maybe<UserConnection>
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

export type QueryUserArgs = {
  by: UserByInput
}

export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>
  before?: InputMaybe<Scalars["String"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<UserOrderByInput>
}

export type StripePayload = {
  __typename?: "StripePayload"
  stripeCheckoutUrl: Scalars["String"]
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
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
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
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
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
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
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
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  title?: InputMaybe<Scalars["String"]>
}

export type SubtaskUpdatePayload = {
  __typename?: "SubtaskUpdatePayload"
  subtask?: Maybe<Subtask>
}

export type SuggestedTask = {
  __typename?: "SuggestedTask"
  note?: Maybe<Scalars["String"]>
  task: Scalars["String"]
}

export type SuggestedTasks = {
  __typename?: "SuggestedTasks"
  intro?: Maybe<Scalars["String"]>
  tasks: Array<Maybe<SuggestedTask>>
}

export type SuggestionsPayload = {
  __typename?: "SuggestionsPayload"
  freeAiTaskUsed?: Maybe<Scalars["Boolean"]>
  needPayment?: Maybe<Scalars["Boolean"]>
  rawResponse?: Maybe<Scalars["String"]>
  suggestedTasks?: Maybe<SuggestedTasks>
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
  note?: Maybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
  subtasks?: Maybe<SubtaskConnection>
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
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
  note?: InputMaybe<Scalars["String"]>
  priority?: Scalars["Int"]
  starred?: Scalars["Boolean"]
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskToTodoCreateSubtaskRelation>>>
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
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
  note?: InputMaybe<Scalars["String"]>
  priority?: InputMaybe<IntOperationsInput>
  starred?: InputMaybe<Scalars["Boolean"]>
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskToTodoUpdateSubtaskRelation>>>
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  title?: InputMaybe<Scalars["String"]>
}

export type TodoUpdatePayload = {
  __typename?: "TodoUpdatePayload"
  todo?: Maybe<Todo>
}

export type User = {
  __typename?: "User"
  collapsedSidebar: Scalars["Boolean"]
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  freeAiTasksAvailable?: Maybe<Scalars["Int"]>
  gpt4TasksAvailable?: Maybe<Scalars["Int"]>
  /** Unique identifier */
  id: Scalars["ID"]
  languageModelUsed: Scalars["String"]
  paidSubscriptionValidUntilDate?: Maybe<Scalars["Date"]>
  stripe?: Maybe<StripePayload>
  suggestions?: Maybe<SuggestionsPayload>
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
}

export type UserStripeArgs = {
  plan: Scalars["String"]
}

export type UserSuggestionsArgs = {
  task: Scalars["String"]
}

export type UserByInput = {
  id?: InputMaybe<Scalars["ID"]>
}

export type UserConnection = {
  __typename?: "UserConnection"
  edges?: Maybe<Array<Maybe<UserEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a User */
export type UserCreateInput = {
  collapsedSidebar?: Scalars["Boolean"]
  freeAiTasksAvailable?: InputMaybe<Scalars["Int"]>
  gpt4TasksAvailable?: InputMaybe<Scalars["Int"]>
  languageModelUsed?: Scalars["String"]
  paidSubscriptionValidUntilDate?: InputMaybe<Scalars["Date"]>
}

export type UserCreatePayload = {
  __typename?: "UserCreatePayload"
  user?: Maybe<User>
}

export type UserDeletePayload = {
  __typename?: "UserDeletePayload"
  deletedId: Scalars["ID"]
}

export type UserEdge = {
  __typename?: "UserEdge"
  cursor: Scalars["String"]
  node: User
}

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>
}

/** Input to update a User */
export type UserUpdateInput = {
  collapsedSidebar?: InputMaybe<Scalars["Boolean"]>
  freeAiTasksAvailable?: InputMaybe<IntOperationsInput>
  gpt4TasksAvailable?: InputMaybe<IntOperationsInput>
  languageModelUsed?: InputMaybe<Scalars["String"]>
  paidSubscriptionValidUntilDate?: InputMaybe<Scalars["Date"]>
}

export type UserUpdatePayload = {
  __typename?: "UserUpdatePayload"
  user?: Maybe<User>
}

export type TodoFragment = {
  __typename?: "Todo"
  id: string
  title: string
  done: boolean
  starred: boolean
  priority: number
  note?: string | null
  tags?: Array<string | null> | null
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
  tags?: Array<string | null> | null
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
        tags?: Array<string | null> | null
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
              tags?: Array<string | null> | null
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

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: "Query"
  userCollection?: {
    __typename?: "UserConnection"
    edges?: Array<{
      __typename?: "UserEdge"
      node: {
        __typename?: "User"
        id: string
        freeAiTasksAvailable?: number | null
        paidSubscriptionValidUntilDate?: any | null
        languageModelUsed: string
        collapsedSidebar: boolean
      }
    } | null> | null
  } | null
}

export type UserCreateMutationVariables = Exact<{
  user: UserCreateInput
}>

export type UserCreateMutation = {
  __typename?: "Mutation"
  userCreate?: {
    __typename?: "UserCreatePayload"
    user?: { __typename?: "User"; id: string } | null
  } | null
}

export type UserUpdateMutationVariables = Exact<{
  id: Scalars["ID"]
  user: UserUpdateInput
}>

export type UserUpdateMutation = {
  __typename?: "Mutation"
  userUpdate?: {
    __typename?: "UserUpdatePayload"
    user?: { __typename?: "User"; id: string } | null
  } | null
}

export type SuggestedTasksQueryVariables = Exact<{
  task: Scalars["String"]
  userId: Scalars["ID"]
}>

export type SuggestedTasksQuery = {
  __typename?: "Query"
  user?: {
    __typename?: "User"
    suggestions?: {
      __typename?: "SuggestionsPayload"
      rawResponse?: string | null
      needPayment?: boolean | null
      freeAiTaskUsed?: boolean | null
      suggestedTasks?: {
        __typename?: "SuggestedTasks"
        intro?: string | null
        tasks: Array<{
          __typename?: "SuggestedTask"
          task: string
          note?: string | null
        } | null>
      } | null
    } | null
  } | null
}

export type StripeQueryVariables = Exact<{
  plan: Scalars["String"]
  userId: Scalars["ID"]
}>

export type StripeQuery = {
  __typename?: "Query"
  user?: {
    __typename?: "User"
    stripe?: { __typename?: "StripePayload"; stripeCheckoutUrl: string } | null
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
          { kind: "Field", name: { kind: "Name", value: "tags" } },
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
          { kind: "Field", name: { kind: "Name", value: "tags" } },
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
          { kind: "Field", name: { kind: "Name", value: "tags" } },
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
          { kind: "Field", name: { kind: "Name", value: "tags" } },
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
export const UserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "User" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userCollection" },
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
                              name: {
                                kind: "Name",
                                value: "freeAiTasksAvailable",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "paidSubscriptionValidUntilDate",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "languageModelUsed",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "collapsedSidebar" },
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
} as unknown as DocumentNode<UserQuery, UserQueryVariables>
export const UserCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
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
} as unknown as DocumentNode<UserCreateMutation, UserCreateMutationVariables>
export const UserUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserUpdate" },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdate" },
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
                  name: { kind: "Name", value: "user" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
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
} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>
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
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
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
            name: { kind: "Name", value: "user" },
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
                        name: { kind: "Name", value: "userId" },
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
                        name: { kind: "Name", value: "rawResponse" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "suggestedTasks" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "intro" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tasks" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "task" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "note" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "needPayment" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "freeAiTaskUsed" },
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
} as unknown as DocumentNode<SuggestedTasksQuery, SuggestedTasksQueryVariables>
export const StripeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Stripe" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "plan" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
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
            name: { kind: "Name", value: "user" },
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
                        name: { kind: "Name", value: "userId" },
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
                  name: { kind: "Name", value: "stripe" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "plan" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "plan" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stripeCheckoutUrl" },
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
} as unknown as DocumentNode<StripeQuery, StripeQueryVariables>
