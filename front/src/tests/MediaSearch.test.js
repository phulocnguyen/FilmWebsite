import MediaSearch from "../pages/MediaSearch.jsx";
import { render, screen, fireEvent } from "@testing-library/react";

describe("MediaSearch", () => {
  test("shows no results when non-matching input is entered", async () => {
    render(<MediaSearch />);
    const searchInput = screen.getByPlaceholderText(/Search BMOVIE/i);
    fireEvent.change(searchInput, {
      target: {
        value: "veryobscuremedianamethatwouldprobablyhavenomatchingresults",
      },
    });

    const noMatchingResultsMessageElement = await screen.findByText(
      /No matching results/i
    );
    expect(noMatchingResultsMessageElement).toBeInTheDocument();
  });

  test("Load More button is not visible when filteredMedias.length is smaller than medias.length", () => {
    const mockState = {
      medias: ["media1", "media2", "media3"],
      filteredMedias: ["media1", "media2", "media3"],
    };

    render(<MediaSearch {...mockState} />);

    const loadMoreButton = screen.queryByText(/Load More/i);
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
