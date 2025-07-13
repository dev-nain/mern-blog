import { Button } from "@/components/Common/Button";
import { AppLogo } from "@/components/Layout/main-layout";

const Topbar = ({
  onPublish,
  onDraft,
  isActionDisabled,
}: {
  onPublish: () => void;
  onDraft: () => void;
  isActionDisabled: boolean;
}) => {
  return (
    <header>
      <nav className="flex w-full justify-between px-[5vw] md:px-[7vw] py-2 border-b border-b-grey">
        <AppLogo />

        <div className="space-x-4">
          <Button
            variant="green"
            disabled={isActionDisabled}
            onClick={onPublish}
          >
            Publish
          </Button>
          <Button
            variant="secondary"
            disabled={isActionDisabled}
            onClick={onDraft}
          >
            Save as Draft
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
