import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminCardListing(props) {
  console.log("props admincardlisting", props);


  const putPost = (e, params) => {
    const action = "putPost";
    const postID = props.id;

    const bodyRequest = {
      action: params.action,
      fields: params.fields,
      value: params.value,
      postID,
    };

    fetch(`/api/post/${postID}`, {
      method: "PUT",
      body: JSON.stringify(bodyRequest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log("Request API", result);
      });
  };

  return (
    <section className="card">
      <p className="indexInfo">{props.id}</p>
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
          <h1>{props.fr.title}</h1>
          <Link href={`/blog/${props.id}`}>
            <a>{`Accéder a ce billet de blog`}</a>
          </Link>
        </div>
        <div className="card_content-img">
          {props.fileName && (
            <Image
              src={`${props.imagePath}`}
              alt="Et ben alors"
              width={225}
              height={150}
              title="test"
            />
          )}
          {!props.fileName && (
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
        <button type="button">Edit</button>
        {props.activate ? (
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
}
