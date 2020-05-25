/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateMovieInput = {
  id?: string | null;
  title: string;
  year?: number | null;
  genres?: string | null;
  rating?: number | null;
  popularity?: number | null;
  overview?: string | null;
  poster?: string | null;
};

export type ModelMovieConditionInput = {
  title?: ModelStringInput | null;
  year?: ModelIntInput | null;
  genres?: ModelStringInput | null;
  rating?: ModelIntInput | null;
  popularity?: ModelIntInput | null;
  overview?: ModelStringInput | null;
  poster?: ModelStringInput | null;
  and?: Array<ModelMovieConditionInput | null> | null;
  or?: Array<ModelMovieConditionInput | null> | null;
  not?: ModelMovieConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateMovieInput = {
  id: string;
  title?: string | null;
  year?: number | null;
  genres?: string | null;
  rating?: number | null;
  popularity?: number | null;
  overview?: string | null;
  poster?: string | null;
};

export type DeleteMovieInput = {
  id?: string | null;
};

export type ModelMovieFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  year?: ModelIntInput | null;
  genres?: ModelStringInput | null;
  rating?: ModelIntInput | null;
  popularity?: ModelIntInput | null;
  overview?: ModelStringInput | null;
  poster?: ModelStringInput | null;
  and?: Array<ModelMovieFilterInput | null> | null;
  or?: Array<ModelMovieFilterInput | null> | null;
  not?: ModelMovieFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CreateMovieMutation = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMovieMutation = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteMovieMutation = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetMovieQuery = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListMoviesQuery = {
  __typename: "ModelMovieConnection";
  items: Array<{
    __typename: "Movie";
    id: string;
    title: string;
    year: number | null;
    genres: string | null;
    rating: number | null;
    popularity: number | null;
    overview: string | null;
    poster: string | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateMovieSubscription = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateMovieSubscription = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteMovieSubscription = {
  __typename: "Movie";
  id: string;
  title: string;
  year: number | null;
  genres: string | null;
  rating: number | null;
  popularity: number | null;
  overview: string | null;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateMovie(
    input: CreateMovieInput,
    condition?: ModelMovieConditionInput
  ): Promise<CreateMovieMutation> {
    const statement = `mutation CreateMovie($input: CreateMovieInput!, $condition: ModelMovieConditionInput) {
        createMovie(input: $input, condition: $condition) {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMovieMutation>response.data.createMovie;
  }
  async UpdateMovie(
    input: UpdateMovieInput,
    condition?: ModelMovieConditionInput
  ): Promise<UpdateMovieMutation> {
    const statement = `mutation UpdateMovie($input: UpdateMovieInput!, $condition: ModelMovieConditionInput) {
        updateMovie(input: $input, condition: $condition) {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMovieMutation>response.data.updateMovie;
  }
  async DeleteMovie(
    input: DeleteMovieInput,
    condition?: ModelMovieConditionInput
  ): Promise<DeleteMovieMutation> {
    const statement = `mutation DeleteMovie($input: DeleteMovieInput!, $condition: ModelMovieConditionInput) {
        deleteMovie(input: $input, condition: $condition) {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMovieMutation>response.data.deleteMovie;
  }
  async GetMovie(id: string): Promise<GetMovieQuery> {
    const statement = `query GetMovie($id: ID!) {
        getMovie(id: $id) {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMovieQuery>response.data.getMovie;
  }
  async ListMovies(
    filter?: ModelMovieFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMoviesQuery> {
    const statement = `query ListMovies($filter: ModelMovieFilterInput, $limit: Int, $nextToken: String) {
        listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            year
            genres
            rating
            popularity
            overview
            poster
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMoviesQuery>response.data.listMovies;
  }
  OnCreateMovieListener: Observable<OnCreateMovieSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateMovie {
        onCreateMovie {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnCreateMovieSubscription>;

  OnUpdateMovieListener: Observable<OnUpdateMovieSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMovie {
        onUpdateMovie {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnUpdateMovieSubscription>;

  OnDeleteMovieListener: Observable<OnDeleteMovieSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMovie {
        onDeleteMovie {
          __typename
          id
          title
          year
          genres
          rating
          popularity
          overview
          poster
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<OnDeleteMovieSubscription>;
}
