// need to create ShowDetail component to show details of a selected show

//use param from react-router-dom to get the id from the url

function ShowDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Show Detail Page</h1>
      <p>Showing details for show ID: {id}</p>
    </div>
  );
}
export default ShowDetail;
