import Billboard from "@/components/Billboard";
import NavBar from "@/components/Navbar";
import MovieList from "@/components/MovieList";

import { NextPageContext } from "next"; 

import { getSession } from "next-auth/react"; 
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth", 
        permanent: false, 
      },
    };
  }

  return {
    props: {},
  };
}

// Default Home component representing the home page of the application
export default function Home() {
  //Showing all the movies
  const {data:movies = [] } = useMovieList();

  // showing only my favorites
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
