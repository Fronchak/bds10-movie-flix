import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { GenreName } from "../../types/domain/GenreName"
import { requestBackend } from "../../util/request";
import Select from 'react-select';
import './styles.css';

type Props = {
  onSelectChange: (value: number) => void
}

const GenreFilter = ({ onSelectChange }: Props) => {
  const [genres, setGenres] = useState<GenreName[]>([]);

  useEffect(() => {
    console.log('Use effect que carrega os gêneros');
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/genres',
      withCredentials: true
    }
    requestBackend(config)
      .then((response) => {
        setGenres(response.data);
      })
      .catch(() => {
        toast.error('Erro em carregas os gêneros');
      })
  }, []);

  const options = () => {
    return genres.map((genre) => ({ value: genre.id, label: genre.name }));
  }

  return (
    <div id="div-select-container">
      <Select
        isClearable
        classNamePrefix="genre-select"
        className="form-control"
        options={ options() }
        onChange={(selectValue) => onSelectChange(selectValue ? selectValue.value : 0)}
      />
    </div>
  );
}

export default GenreFilter;
