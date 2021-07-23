import ArrivedItem from './ArrivedItem.js';

function Arrive({ items }) {

    return (
      <section className="flex flex-col py-16">
      <div className="container mx-auto mb-4">
        <div className="flex justify-center text-center mb-4">
          <h3 className="text-2xl capitalize font-semibold">
            <br className="" />Pokemon List
          </h3>
        </div>
      </div>
      <div className="overflow-x-hidden px-4" id="carousel">
        <div className="container mx-auto"></div>
        <div className="flex -mx-4 flex-row relative">

        {items.map(({name, url}) => (
          
          <ArrivedItem item={name} key={name} url={url} />
        ))}

          {/* {items && items.map(function(item, i) {
            return (
              <ArrivedItem item={item} key={item.id} />
          
            )
          })} */}
          

        </div>
      </div>
    </section>
    );
}

export default Arrive;