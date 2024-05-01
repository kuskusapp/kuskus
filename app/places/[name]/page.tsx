export default async function Place(props: any) {
  console.log(props)
  return (
    <div className="bg-white p-5 grid grid-cols-3">
      <header className="col-span-1 w-1/2">
        <div className="flex items-start">
          <img
            src="exampleimage.jpg"
            alt="avatar"
            className="rounded-full w-46 h-46 mb-5"
          />
          <div className="flex flex-col ml-4 space-y-2">
            <h3 className="text-base">{props.params.name}</h3>
            <h3 className="text-neutral-400 text-xs">coffeeshop</h3>
            <h3 className="text-xs">555 followers</h3>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-3 text-base">City, location</h3>
          {/* {props.params.location} */}
          <h4 className="text-xs text-neutral-500 mb-1">
            liked by usernames+...
          </h4>
          <h4 className="text-xs text-neutral-500">total likes</h4>
          <h4 className="text-s text-neutral-800 mt-2">adress</h4>
          <h4 className="text-xs text-neutral-600 mt-1">~2.3 km from you</h4>
        </div>
        <div className="mt-4">
          <p className="text-gray-900 text-s font-light mt-2">
            text text text text text text text text text text text text text
            text text text text text text text text text text text
            {/* {props.params.description} */}
          </p>
          <div className="mt-4">
            <span className="text-gray-400 text-s">you might like</span>
            <ul className="mt-2">
              {[
                {
                  name: "place",
                  category: "category",
                  link: "/places/place1",
                  img: "image1.jpg",
                },
                {
                  name: "place",
                  category: "category",
                  link: "/places/place2",
                  img: "image2.jpg",
                },
                {
                  name: "place",
                  category: "category",
                  link: "/places/place3",
                  img: "image3.jpg",
                },
              ].map((item) => (
                <li
                  key={item.name}
                  className="cursor-pointer flex items-center mb-3"
                >
                  <a href={item.link} className="flex items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="rounded-full w-6 h-6 mr-2"
                    />
                    <div>
                      <h3>{item.name}</h3>
                      <h4 className="text-gray-500 text-xs">{item.category}</h4>
                    </div>
                  </a>
                </li>
              ))}
              wk
            </ul>
          </div>
        </div>
      </header>
      <main className="col-span-1 flex justify-center">
        <h3>content</h3>
      </main>
      <div className="col-span-1 flex justify-center">
        <div className="bg-white">
          <h2 className="text-gray-800">comments</h2>
        </div>
      </div>
    </div>
  )
}
