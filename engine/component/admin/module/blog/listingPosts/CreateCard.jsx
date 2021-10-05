import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CreateCard({
  array,
  putPost,
  showEditModule,
  ...props
}) {
  console.log(array);

  return array.map((post, key) => {
    if (typeof post.activate === "boolean") {
      return (
        <section className="card">
          <p className="indexInfo">{post.id}</p>
          <button
            type="button"
            className="btn_close-topRight"
            onClick={(e) =>
              putPost(e, {
                action: "alterateEntrie",
                fields: "activate",
                value: "trash",
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
            <button type="button" onClick={showEditModule}>
              Edit
            </button>
            {post.activate ? (
              <button
                type="button"
                onClick={(e) =>
                  putPost(e, {
                    action: "alterateEntrie",
                    fields: "activate",
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
                  })
                }
                data-action="deactivePost"
              >
                Active
              </button>
            )}
            <button
              type="button"
              onClick={(e) =>
                putPost(e, {
                  action: "alterateEntrie",
                  fields: "timestamp",
                  value: Date.now(),
                })
              }
            >
              Repost
            </button>
          </footer>
        </section>
      );
    } else {
      return;
    }
  });
}
