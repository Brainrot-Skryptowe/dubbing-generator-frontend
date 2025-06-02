import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

interface SortingSettingsContainerProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDir: string;
  setSortDir: (value: string) => void;
}

function SortingSettingsContainer({
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}: SortingSettingsContainerProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <h2 className="text-white text-xl font-semibold">Sort movies</h2>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-48 border border-white bg-zinc-800 text-white p-6">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border border-white text-white">
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="duration">Duration</SelectItem>
          <SelectItem value="created_at">Created At</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortDir} onValueChange={setSortDir}>
        <SelectTrigger className="w-48 border border-white bg-zinc-800 text-white p-6">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border border-white text-white">
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortingSettingsContainer;
