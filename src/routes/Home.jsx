import CardList from "../components/CardList";
import SearchInput from "../components/SearchInput";

function Home() {
  

  return (
    <div className="mx-2 space-y-5">
      <SearchInput />
      <CardList title="Melhores Avaliados" path="getByRate"/>
      <CardList title="Mais Recentes" path="getByDate"/>
    </div>
  );
}

export default Home;
