import { Button } from "@mui/material";
import NewLogo from "./Logo";

interface HeaderProps {
  onAllOn: () => void;
  onAllOff: () => void;
  onReset: () => void;
  onFilter: (f: "all" | "on" | "off") => void;
}

export const Header = ({
  onAllOn,
  onAllOff,
  onReset,
  onFilter,
}: HeaderProps) => (
  <header className="mb-8">
    <div className="flex flex-col gap-6">
      {/* LOGO – vždy hore */}
      <NewLogo className="w-80 sm:w-96" />

      {/* MENU */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        {/* AKCIE */}
        <div className="order-1 flex flex-wrap gap-2 lg:order-2">
          <Button variant="contained" onClick={onReset}>
            Default
          </Button>
          <Button variant="contained" color="success" onClick={onAllOn}>
            Všetko zapnúť
          </Button>
          <Button variant="contained" color="error" onClick={onAllOff}>
            Všetko vypnúť
          </Button>
        </div>

        {/* FILTRE */}
        <div className="order-2 flex flex-wrap gap-2 lg:order-1">
          <Button variant="outlined" onClick={() => onFilter("all")}>
            Všetko
          </Button>
          <Button variant="outlined" onClick={() => onFilter("on")}>
            Zapnuté
          </Button>
          <Button variant="outlined" onClick={() => onFilter("off")}>
            Vypnuté
          </Button>
        </div>
      </div>
    </div>
  </header>
);
