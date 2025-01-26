import SnippetCard from "./SnippetCard";
import Loader from "./Loader";

const Profile = ({ name, desc, data, handleEdit, handleDelete, isLoading = false }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {isLoading ? (
        <div className="mt-10 flex-center">
          <Loader />
        </div>
      ) : (
        <div className='mt-10 snippet_layout'>
          {data.map((post) => (
            <SnippetCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
