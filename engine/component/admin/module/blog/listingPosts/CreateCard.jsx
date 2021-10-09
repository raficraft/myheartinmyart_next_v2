import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CreateCard({
  array,
  putPost,
  showEditModule,
  filterBy,
  delPost,
  ...props
}) {
  console.log(array);
  console.log(filterBy);

  const condition = (filterBy, post) => {
    console.log(post);
    return filterBy === "trash"
      ? post.activate === "trash"
      : post.activate !== "trash";
  };

  return array
    .filter((post, k) => condition(filterBy, post))
    .map((post, key) => {
      {
        return (
          <section className="card" key={key}>
            <p className="indexInfo">{post.id}</p>
            <button
              type="button"
              className="btn_close-topRight"
              onClick={(e) =>
                filterBy !== "trash"
                  ? putPost(e, {
                      action: "alterateEntrie",
                      fields: "activate",
                      value: "trash",
                      postId: post.id,
                    })
                  : delPost(e, {
                      action: "deletePost",
                      postId: post.id,
                    })
              }
              data-action="delPost"
            >
              X
            </button>
            <div className="card_content">
              <div className="card_content-info">
                <h1>{post.fr.title}</h1>
                <Link href={`/blog/${post.id}`}>
                  <a>{`Accéder a ce billet de blog`}</a>
                </Link>
              </div>
              <div className="card_content-img">
                {post.fileName && (
                  <Image
                    src={`${post.imagePath}`}
                    alt="Et ben alors"
                    width={225}
                    height={150}
                    title="test"
                  />
                )}
                {!post.fileName && (
                  <Image
                    src="/assets/blog/posts/placeholder.png"
                    alt="lol"
                    width={150}
                    height={150}
                  />
                )}
              </div>
            </div>
            <footer>
              <button type="button" onClick={(e) => showEditModule(e, post.id)}>
                Edit
              </button>
              {post.activate ? (
                <button
                  type="button"
                  onClick={(e) =>
                    putPost(e, {
                      action: "alterateEntrie",
                      fields: "activate",
                      postId: post.id,
                      value: false,
                    })
                  }
                  data-action="activatePost"
                >
                  Deactive
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) =>
                    putPost(e, {
                      action: "alterateEntrie",
                      fields: "activate",
                      value: true,
                      postId: post.id,
                    })
                  }
                  data-action="deactivePost"
                >
                  Active
                </button>
              )}

              {filterBy !== "trash" ? (
                <button
                  type="button"
                  onClick={(e) =>
                    putPost(e, {
                      action: "alterateEntrie",
                      fields: "timestamp",
                      value: Date.now(),
                      postId: post.id,
                    })
                  }
                >
                  Repost
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) =>
                    putPost(e, {
                      action: "alterateEntrie",
                      fields: "activate",
                      value: false,
                      postId: post.id,
                    })
                  }
                >
                  Restore
                </button>
              )}
            </footer>
          </section>
        );
      }
    });
}
