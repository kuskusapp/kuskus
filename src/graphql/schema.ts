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

export type Subtask = {
  __typename?: "Subtask"
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
  done: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
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
  done: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
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

export type Todo = {
  __typename?: "Todo"
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
  done: Scalars["Boolean"]
  dueDate?: InputMaybe<Scalars["String"]>
  note?: InputMaybe<Scalars["String"]>
  priority: Scalars["Int"]
  starred: Scalars["Boolean"]
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
  done?: InputMaybe<Scalars["Boolean"]>
  dueDate?: InputMaybe<Scalars["String"]>
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

export type User = {
  __typename?: "User"
  /** when the model was created */
  createdAt: Scalars["DateTime"]
  /** Unique identifier */
  id: Scalars["ID"]
  /** when the model was updated */
  updatedAt: Scalars["DateTime"]
  username: Scalars["String"]
}

export type UserByInput = {
  id?: InputMaybe<Scalars["ID"]>
  username?: InputMaybe<Scalars["String"]>
}

export type UserConnection = {
  __typename?: "UserConnection"
  edges?: Maybe<Array<Maybe<UserEdge>>>
  /** Information to aid in pagination */
  pageInfo: PageInfo
}

/** Input to create a User */
export type UserCreateInput = {
  username: Scalars["String"]
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
  username?: InputMaybe<Scalars["String"]>
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
      }
    } | null> | null
  } | null
}

export type CreateTodoMutationVariables = Exact<{
  todo: TodoCreateInput
}>

export type CreateTodoMutation = {
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
    todo?: { __typename?: "Todo"; id: string; title: string } | null
  } | null
}

export type TodoDeleteMutationVariables = Exact<{
  id: Scalars["ID"]
}>

export type TodoDeleteMutation = {
  __typename?: "Mutation"
  todoDelete?: { __typename?: "TodoDeletePayload"; deletedId: string } | null
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
  ],
} as unknown as DocumentNode<TodosQuery, TodosQueryVariables>
export const CreateTodoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTodo" },
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
} as unknown as DocumentNode<CreateTodoMutation, CreateTodoMutationVariables>
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
                      { kind: "Field", name: { kind: "Name", value: "title" } },
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
