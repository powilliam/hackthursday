import { Source } from "data/entity/source";

export interface Article {
  readonly source: Source;
  readonly author: string;
  readonly title: string;
  readonly description?: string;
  readonly url: string;
  readonly urlToImage: string;
  readonly publishedAt: string;
  readonly content: string;
}
