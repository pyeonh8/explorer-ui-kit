const CharacterPanel = ({ selectedAmiibo }: { selectedAmiibo: string[] }) => {
  console.log(selectedAmiibo);

  return (
    <div className="p-[50px]">
      캐릭터 창
      <div className="flex gap-4">
        {selectedAmiibo?.map((v) => {
          return <div key={v}>{v}</div>;
        })}
      </div>
    </div>
  );
};

export default CharacterPanel;
