interface Props {
  name:
    | "Calendar"
    | "Done"
    | "Square"
    | "SquareCheck"
    | "Inbox"
    | "Star"
    | "Plus"
    | "Priority 3"
    | "Priority 2"
    | "Priority 1"
    | "StarWithPriority1"
    | "StarWithPriority2"
    | "StarWithPriority3"
    | "GitHub"
    | "Google"
    | "Question"
    | "Settings"
    | "SignOut"
    | "Note"
    | "Cross"
    | "Bug"
    | "Discord"
    | "Search"
    | "N key"
    | "F key"
    | "Github"
    | "Twitter"
}

export default function Icon(props: Props) {
  switch (props.name) {
    case "Calendar":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 4.75V8.25"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M16 4.75V8.25"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7.75 10.75H16.25"
          />
        </svg>
      )
    case "Twitter":
      return (
        <svg
          viewBox="0 -2 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <defs> </defs>{" "}
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              {" "}
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-60.000000, -7521.000000)"
                fill="#919191"
              >
                {" "}
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  {" "}
                  <path
                    d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                    id="twitter-[#333333]"
                  >
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      )
    case "Done":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2502 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.2502C18.3548 4.75 19.2502 5.64543 19.2502 6.75V17.25C19.2502 18.3546 18.3548 19.25 17.2502 19.25Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8.75 12L11 14.25L15.25 9.75"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case "Square":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2502 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.2502C18.3548 4.75 19.2502 5.64543 19.2502 6.75V17.25C19.2502 18.3546 18.3548 19.25 17.2502 19.25Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-opacity={0.4}
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case "SquareCheck":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2502 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.2502C18.3548 4.75 19.2502 5.64543 19.2502 6.75V17.25C19.2502 18.3546 18.3548 19.25 17.2502 19.25Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8.75 12L11 14.25L15.25 9.75"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case "Inbox":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19.25 11.75L17.6644 6.20056C17.4191 5.34195 16.6344 4.75 15.7414 4.75H8.2586C7.36564 4.75 6.58087 5.34196 6.33555 6.20056L4.75 11.75"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10.2142 12.3689C9.95611 12.0327 9.59467 11.75 9.17085 11.75H4.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V11.75H14.8291C14.4053 11.75 14.0439 12.0327 13.7858 12.3689C13.3745 12.9046 12.7276 13.25 12 13.25C11.2724 13.25 10.6255 12.9046 10.2142 12.3689Z"
          ></path>
        </svg>
      )
    case "Star":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4.75L13.75 10.25H19.25L14.75 13.75L16.25 19.25L12 15.75L7.75 19.25L9.25 13.75L4.75 10.25H10.25L12 4.75Z"
          ></path>
        </svg>
      )
    case "Plus":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 5.75V18.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M18.25 12L5.75 12"
          ></path>
        </svg>
      )
    case "Priority 3":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 5.75H19.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 18.25H19.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 12H19.25"
          ></path>
        </svg>
      )
    case "Priority 2":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 5.75H19.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 12H19.25"
          ></path>
        </svg>
      )
    case "Priority 1":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4.75 5.75H19.25"
          ></path>
        </svg>
      )
    case "GitHub":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            filter:
              "invert(100%) sepia(10%) saturate(7470%) hue-rotate(268deg) brightness(118%) contrast(105%)",
          }}
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "Google":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="24"
          height="24"
          style={{
            filter:
              "invert(100%) sepia(10%) saturate(7470%) hue-rotate(268deg) brightness(118%) contrast(105%)",
          }}
        >
          <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z" />
        </svg>
      )
    case "Question":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8.249 7a4.25 4.25 0 1 1 5.678 5.789C12.943 13.29 12 14.145 12 15.25M12 19v.25"
          ></path>
        </svg>
      )
    case "Settings":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.62117 14.9627L6.72197 15.1351C7.53458 15.2623 8.11491 16.0066 8.05506 16.8451L7.97396 17.9816C7.95034 18.3127 8.12672 18.6244 8.41885 18.7686L9.23303 19.1697C9.52516 19.3139 9.87399 19.2599 10.1126 19.0352L10.9307 18.262C11.5339 17.6917 12.4646 17.6917 13.0685 18.262L13.8866 19.0352C14.1252 19.2608 14.4733 19.3139 14.7662 19.1697L15.5819 18.7678C15.8733 18.6244 16.0489 18.3135 16.0253 17.9833L15.9441 16.8451C15.8843 16.0066 16.4646 15.2623 17.2772 15.1351L18.378 14.9627C18.6985 14.9128 18.9568 14.6671 19.0292 14.3433L19.23 13.4428C19.3025 13.119 19.1741 12.7831 18.9064 12.5962L17.9875 11.9526C17.3095 11.4774 17.1024 10.5495 17.5119 9.82051L18.067 8.83299C18.2284 8.54543 18.2017 8.18538 17.9993 7.92602L17.4363 7.2035C17.2339 6.94413 16.8969 6.83701 16.5867 6.93447L15.5221 7.26794C14.7355 7.51441 13.8969 7.1012 13.5945 6.31908L13.1866 5.26148C13.0669 4.95218 12.7748 4.7492 12.4496 4.75L11.5472 4.75242C11.222 4.75322 10.9307 4.95782 10.8126 5.26793L10.4149 6.31344C10.1157 7.1004 9.27319 7.51683 8.4842 7.26874L7.37553 6.92078C7.0645 6.82251 6.72591 6.93044 6.52355 7.19142L5.96448 7.91474C5.76212 8.17652 5.73771 8.53738 5.90228 8.82493L6.47 9.81487C6.88812 10.5446 6.68339 11.4814 6.00149 11.9591L5.0936 12.5954C4.82588 12.7831 4.69754 13.119 4.76998 13.442L4.97077 14.3425C5.04242 14.6671 5.30069 14.9128 5.62117 14.9627Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M13.5911 10.4089C14.4696 11.2875 14.4696 12.7125 13.5911 13.5911C12.7125 14.4696 11.2875 14.4696 10.4089 13.5911C9.53036 12.7125 9.53036 11.2875 10.4089 10.4089C11.2875 9.53036 12.7125 9.53036 13.5911 10.4089Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case "Github":
      return (
        <svg
          viewBox="0 -3.5 256 256"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g fill="#878787">
              {" "}
              <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"></path>{" "}
              <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      )
    case "SignOut":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.75 4.75L13.25 7.82143V19.25L5.75 16.1786V4.75ZM5.75 4.75L17.2557 4.81575C17.8058 4.81889 18.25 5.26568 18.25 5.81573V16.25C18.25 16.8023 17.8023 17.25 17.25 17.25H13.25"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case "StarWithPriority3":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13 4.75L14.75 10.25H20.25L15.75 13.75L17.25 19.25L13 15.75"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 6.5H11"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 15.5H11"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 11H11"
          ></path>
        </svg>
      )
    case "StarWithPriority2":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13 4.75L14.75 10.25H20.25L15.75 13.75L17.25 19.25L13 15.75"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 6.5H11"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 11H11"
          ></path>
        </svg>
      )
    case "StarWithPriority1":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13 4.75L14.75 10.25H20.25L15.75 13.75L17.25 19.25L13 15.75"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.75 6.5H11"
          ></path>
        </svg>
      )
    case "Note":
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M18 9.25H13.75V5"
          ></path>
        </svg>
      )
    case "Cross":
      return (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M17.25 6.75L6.75 17.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6.75 6.75L17.25 17.25"
          ></path>
        </svg>
      )
    case "Bug":
      return (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M17.25 6.75L6.75 17.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6.75 6.75L17.25 17.25"
          ></path>
        </svg>
      )
    case "Discord":
      return (
        <svg
          viewBox="0 -28.5 256 256"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path
                d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                fill="#919191"
                fill-rule="nonzero"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>
        </svg>
      )
    case "N key":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_1_26" fill="white">
            <path d="M0 20C0 8.9543 8.95431 0 20 0H80C91.0457 0 100 8.95431 100 20V80C100 91.0457 91.0457 100 80 100H20C8.9543 100 0 91.0457 0 80V20Z" />
          </mask>
          <path
            d="M0 20C0 8.9543 8.95431 0 20 0H80C91.0457 0 100 8.95431 100 20V80C100 91.0457 91.0457 100 80 100H20C8.9543 100 0 91.0457 0 80V20Z"
            fill="#D9D9D9"
          />
          <path
            d="M-5 20C-5 6.19288 6.19288 -5 20 -5H80C93.8071 -5 105 6.19288 105 20H95C95 11.7157 88.2843 5 80 5H20C11.7157 5 5 11.7157 5 20H-5ZM105 85C105 98.8071 93.8071 110 80 110H20C6.19288 110 -5 98.8071 -5 85L5 80C5 85.5229 11.7157 90 20 90H80C88.2843 90 95 85.5229 95 80L105 85ZM20 110C6.19288 110 -5 98.8071 -5 85V20C-5 6.19288 6.19288 -5 20 -5V5C11.7157 5 5 11.7157 5 20V80C5 85.5229 11.7157 90 20 90V110ZM80 -5C93.8071 -5 105 6.19288 105 20V85C105 98.8071 93.8071 110 80 110V90C88.2843 90 95 85.5229 95 80V20C95 11.7157 88.2843 5 80 5V-5Z"
            fill="black"
            mask="url(#path-1-inside-1_1_26)"
          />
          <path
            d="M63.2184 32.2727V65H57.2418L43.0036 44.4016H42.7638V65H35.8445V32.2727H41.9169L56.0433 52.8551H56.331V32.2727H63.2184Z"
            fill="black"
          />
        </svg>
      )
    case "Search":
      return (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
          ></path>
        </svg>
      )
    default:
      return <></>
  }
}
