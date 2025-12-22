import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";

export default function Home({ setChatting }: { setChatting: () => void }) {
  return (
    <div className="h-full w-full p-2 flex items-center justify-center flex-col gap-8 -my-8">
      <h2 className="text-3xl tracking-wide font-light">
        Meow meow purr meow lick?
      </h2>
      <InputGroup className="w-1/2 rounded-full resize-none shadow-sm shadow-gray-300 p-2 h-3">
        <InputGroupTextarea
          rows={1}
          placeholder="Ask anymeow"
          className="h-3"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            variant="default"
            onClick={setChatting}
          >
            <ArrowUpIcon width={24} height={24} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
