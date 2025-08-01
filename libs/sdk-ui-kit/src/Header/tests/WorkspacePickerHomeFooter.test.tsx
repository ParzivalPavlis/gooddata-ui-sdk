// (C) 2021-2025 GoodData Corporation
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import { WorkspacePickerHomeFooter, IWorkspacePickerHomeFooterProps } from "../WorkspacePickerHomeFooter.js";

describe("WorkspacePickerHomeFooter", () => {
    function renderWorkspacePickerHomeFooter(props: IWorkspacePickerHomeFooterProps = {}) {
        return render(<WorkspacePickerHomeFooter {...props} />);
    }

    it("should render home icon and call onClick when clicked", async () => {
        const onClick = vi.fn();
        renderWorkspacePickerHomeFooter({ onClick });

        const homeIcon = screen.getByTestId("s-workspace-picker-home-footer");

        expect(homeIcon).toBeInTheDocument();

        await userEvent.click(homeIcon);

        await waitFor(() => expect(onClick).toBeCalled());
    });
});
