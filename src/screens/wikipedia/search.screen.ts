import { Screen } from "../../framework";

export class SearchScreen implements Screen<"search"> {
  public readonly name: "search" = "search";
  public readonly searchInput = "input[aria-label='Search Wikipedia']";
  public readonly searchButton = "button[type='submit']";
}

export const searchScreen = new SearchScreen();
