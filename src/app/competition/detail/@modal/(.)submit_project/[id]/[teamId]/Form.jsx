'use client';
import { submitProjectCompetition } from '@/lib/actions/competitionAction';
import { getDetailTeamCompetition } from '@/lib/actions/teamCompetitionAction';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form({ competitionId, teamId }) {
  const router = useRouter();
  const [projectLink, setProjectLink] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');

  // Error Handling
  const [errorProjectLink, setErrorProjectLink] = useState('');
  const [errorRepositoryLink, setErrorRepositoryLink] = useState('');

  // Load Handling
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkHaveBeenSubmitProject = async () => {
      const resTeamCompetition = await getDetailTeamCompetition(
        competitionId,
        teamId,
      );
      if (resTeamCompetition.success) {
        const team = resTeamCompetition.data;
        if (team.projectLink && team.repositoryLink) {
          router.back();
        }
      }
    };
    checkHaveBeenSubmitProject();
  }, [competitionId, teamId, router]);

  useEffect(() => {
    if (projectLink) {
      const regex = /^(https?:\/\/)/;
      const projectLinkRegex = regex.test(projectLink);
      if (!projectLinkRegex) {
        setErrorProjectLink(
          'Project link must be started with http:// or https://',
        );
      } else {
        setErrorProjectLink('');
      }
    }

    if (repositoryLink) {
      const regex = /^(https?:\/\/)/;
      const repositoryLinkRegex = regex.test(repositoryLink);
      if (!repositoryLinkRegex) {
        setErrorRepositoryLink(
          'Repository link must be started with http:// or https://',
        );
      } else {
        setErrorRepositoryLink('');
      }
    }
  }, [projectLink, repositoryLink]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (projectLink == '' || repositoryLink == '') {
      if (projectLink == '') {
        setErrorProjectLink('Project link must be filled');
      }
      if (repositoryLink == '') {
        setErrorRepositoryLink('Repository link must be filled');
      }
      setIsSuccess(false);
      setMessage('Failed, Project link and repository link must be filled');
      setIsLoading(false);
      return;
    }

    if (errorProjectLink != '' || errorRepositoryLink != '') {
      setIsSuccess(false);
      setMessage('Failed, Please check form again');
      setIsLoading(false);
      return;
    }

    const data = {
      projectLink: projectLink,
      repositoryLink: repositoryLink,
    };

    const response = await submitProjectCompetition(
      competitionId,
      teamId,
      data,
    );

    if (!response.success) {
      setIsSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setMessage('Success, Project has been submitted');
    setIsLoading(false);
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
    setIsLoading(false);
  };

  return (
    <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[60vw]">
      {message !== '' && (
        <div
          className={`rounded-md ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <form action="" className="space-y-3">
        <div>
          <label className="font-medium">Project Link</label>
          <input
            type="text"
            name="project_link"
            id="project_link"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your project link here"
            onChange={e => setProjectLink(e.target.value)}
          />
          {errorProjectLink && (
            <span className="text-red-500 text-sm italic">
              {errorProjectLink}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Repository Link</label>
          <input
            type="text"
            name="repository_link"
            id="repository_link"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your repository link here"
            onChange={e => setRepositoryLink(e.target.value)}
          />
          {errorRepositoryLink && (
            <span className="text-red-500 text-sm italic">
              {errorRepositoryLink}
            </span>
          )}
        </div>
      </form>
      <div className="flex flex-col tablet:flex-row justify-start gap-3 py-3">
        {isLoading && <p className="italic text-neutral-500">Loading...</p>}
        {!isLoading && (
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-fit bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        )}
        {!isLoading && (
          <button
            disabled={isLoading}
            onClick={() => router.back()}
            className="w-fit bg-red-500 text-white p-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Cancel'}
          </button>
        )}
      </div>
    </div>
  );
}
